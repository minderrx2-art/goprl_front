export interface ShortenResponse {
    expires_at?: string,
    short_url?: string,
    error?: string
}

export async function shortenUrl(url: string): Promise<ShortenResponse> {
    if (!url) {
        return { error: "URL is required" };
    }

    try {
        const response = await fetch("/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        }
        return { error: data.error || "Failed to shorten URL" };
    } catch (err) {
        return { error: "Network error. Please try again." };
    }
}
