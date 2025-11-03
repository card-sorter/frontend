import { useEffect, useMemo, useRef, useState } from "react";
import SideBar from "./SideBar";
import Progress from "./Progress";
import { Box, Play, PlayCircle, Square, Octagon } from "lucide-react";
import {
    startJob, resumeJob, stopJob, eStopJob,
    getStatus, openStatusStream
} from "../api/jobApi";

const STATES = { idle: "IDLE", running: "RUNNING", paused: "PAUSED", eStopped: "E_STOP", done: "DONE" };

export default function Layout({ children }) {
    const [progress, setProgress] = useState(0);
    const [state, setState] = useState(STATES.idle);
    const [jobId, setJobId] = useState(null);

    // poller/sse
    const pollerRef = useRef(null);
    const closeSSERef = useRef(null);

    // enable/disable buttons
    const canStart  = state === STATES.idle || state === STATES.done || !jobId;
    const canResume = state === STATES.paused && jobId;
    const canStop   = (state === STATES.running || state === STATES.paused) && jobId;
    const canEStop  = state !== STATES.eStopped && !!jobId;

    const stateLabel = useMemo(() => {
        switch (state) {
            case STATES.running: return "Running";
            case STATES.paused: return "Paused";
            case STATES.eStopped: return "Emergency Stopped";
            case STATES.done: return "Complete";
            default: return "Idle";
        }
    }, [state]);

    // progress
    const stopPolling = () => {
        if (pollerRef.current) {
            clearInterval(pollerRef.current);
            pollerRef.current = null;
        }
    };
    const stopSSE = () => {
        if (closeSSERef.current) {
            closeSSERef.current();
            closeSSERef.current = null;
        }
    };

    const beginPolling = (id) => {
        stopPolling();
        pollerRef.current = setInterval(async () => {
            try {
                const s = await getStatus(id);
                if (typeof s.progress === "number") setProgress(Math.max(0, Math.min(100, s.progress)));
                if (s.state) setState(s.state);
                if (s.state === STATES.done || s.state === STATES.eStopped || s.state === STATES.idle) {
                    stopPolling();
                }
            } catch (e) {
                console.error(e);
                stopPolling();
            }
        }, 1000); // 1s
    };

    const tryOpenSSE = (id) => {
        stopSSE();
        try {
            closeSSERef.current = openStatusStream(id, (s) => {
                if (typeof s.progress === "number") setProgress(Math.max(0, Math.min(100, s.progress)));
                if (s.state) setState(s.state);
            });
        } catch {
            // ignore if SSE not available
        }
    };

    useEffect(() => {
        return () => { stopPolling(); stopSSE(); };
    }, []);

    // buttons
    const onStart = async () => {
        try {
            const { jobId: id } = await startJob();
            setJobId(id);
            setState(STATES.running);
            setProgress(0);
            tryOpenSSE(id);     // if server supports SSE this will live-update
            beginPolling(id);   // polling fallback (keeps working even without SSE)
        } catch (e) {
            console.error(e);
        }
    };

    const onResume = async () => {
        if (!jobId) return;
        try {
            await resumeJob(jobId);
            setState(STATES.running);
            tryOpenSSE(jobId);
            beginPolling(jobId);
        } catch (e) {
            console.error(e);
        }
    };

    const onStop = async () => {
        if (!jobId) return;
        try {
            await stopJob(jobId);
            setState(STATES.paused);
            // keep the last progress value shown
        } catch (e) {
            console.error(e);
        }
    };

    const onEStop = async () => {
        if (!jobId) return;
        try {
            await eStopJob(jobId);
            setState(STATES.eStopped);
            stopPolling();
            stopSSE();
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (state === STATES.done) setProgress(100);
    }, [state]);

    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-100">
            <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3 backdrop-blur">
                {/* Title */}
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <Box className="size-5" />
                    Tobor v.1
                </div>

                {/* Progress */}
                <div className="ml-6 flex-1">
                    <Progress value={progress} label={progress >= 100 ? "Complete" : `${Math.round(progress)}%`} />
                </div>

                {/* Controls */}
                <div className="ml-4 flex items-center gap-2">
                    <span className="mr-2 hidden text-xs text-zinc-400 sm:inline">{stateLabel}{jobId ? ` · ${jobId}` : ""}</span>

                    <button
                        onClick={onStart}
                        disabled={!canStart}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold
              ${canStart ? "bg-green-600 hover:bg-green-500 text-white" : "bg-green-900/40 text-green-200 cursor-not-allowed"}`}
                        aria-label="Start"
                        title="Start"
                    >
                        <Play className="size-4" /> Start
                    </button>

                    <button
                        onClick={onResume}
                        disabled={!canResume}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold
              ${canResume ? "bg-zinc-600 hover:bg-zinc-500 text-white" : "bg-zinc-800/60 text-zinc-300 cursor-not-allowed"}`}
                        aria-label="Resume"
                        title="Resume"
                    >
                        <PlayCircle className="size-4" /> Resume
                    </button>

                    <button
                        onClick={onStop}
                        disabled={!canStop}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold
              ${canStop ? "bg-amber-400 hover:bg-amber-300 text-black" : "bg-amber-900/30 text-amber-200 cursor-not-allowed"}`}
                        aria-label="Stop"
                        title="Stop (safe pause)"
                    >
                        <Square className="size-4" /> Stop
                    </button>

                    <button
                        onClick={onEStop}
                        disabled={!canEStop}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-extrabold
              ${canEStop ? "bg-red-600 hover:bg-red-500 text-white" : "bg-red-900/40 text-red-200 cursor-not-allowed"}`}
                        aria-label="Emergency Stop"
                        title="Emergency Stop (immediate halt)"
                    >
                        <Octagon className="size-4" /> E-Stop
                    </button>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-6xl gap-4 px-4 py-4">
                <aside className="sticky top-[64px] h-[calc(100vh-64px)] w-14 shrink-0 space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2">
                    <SideBar />
                </aside>

                <section className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
                    {children}
                </section>
            </main>
        </div>
    );
}
