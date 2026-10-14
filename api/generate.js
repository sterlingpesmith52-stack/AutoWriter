
export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }

    try {

        const prompt = req.body.prompt;

        if (!prompt) {

            return res.status(400).json({
                error: "Prompt required"
            });

        }

        const hfResponse =
            await fetch(
                "https://router.huggingface.co/v1/chat/completions",
                {
                    method: "POST",

                    headers: {
                        "Authorization":
                            `Bearer ${process.env.HF_API_KEY}`,
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        model:
                            "deepseek-ai/DeepSeek-V4.1-Flash",

                        messages: [
                            {
                                role: "user",
                                content: prompt
                            }
                        ]
                    })
                }
            );

        const data =
            await hfResponse.json();

        return res
            .status(hfResponse.status)
            .json(data);

    }
    catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }
}
