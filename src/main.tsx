import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { App } from "#/App";
import { ThemeProvider } from "#/integrations/theme";
import "#/styles.css";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Fant ikke #root i index.html");
}

createRoot(root).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
