
const API_BASE = (process.env.REACT_APP_API_BASE || "http://localhost:8000").replace(/\/+$/, "");


async function req(path, init) {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
        credentials: "omit",
        ...init,
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} @ ${path} :: ${text}`);
    }
    return res.status === 204 ? null : res.json();
}

//control
export async function startJob() {
    // FastAPI returns full status: { state, progress, jobId }
    return req("/control/start", { method: "POST", body: "{}" });
}

export async function stopJob() {
    return req("/control/stop", { method: "POST", body: "{}" });
}

export async function eStopJob() {
    return req("/control/estop", { method: "POST", body: "{}" });
}

export async function getStatus() {
    return req("/control/status", { method: "GET" });
}

//
export async function resumeJob() {
    return startJob();
}

//
export function openStatusStream(_jobId, _onMessage) {
    return () => {};
}
