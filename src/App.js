import { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import QrCode from "react-qr-code";
import Download from "./Download";
import html2canvas from "html2canvas";
import download from "downloadjs";
import "./app.css";

function App() {
    const [value, setValue] = useState("");
    const qrcodeRef = useRef(null);
    const [config, setCol] = useState({
        fgColor: "#000000",
        bgColor: "#ffffff",
    });

    const handleDownload = () => {
        html2canvas(qrcodeRef.current).then((canvas) => {
            const dataUrl = canvas.toDataURL();
            download(dataUrl, `qrcode_${value.trim().replace(" ", "_")}.png`);
        });
    };

    return (
        <div
            className="h-5/6 p-4 rounded-lg shadow-md flex flex-col items-center justify-center space-y-4 overflow-auto"
            style={{
                width: "400px",
                maxWidth: "90vw",
                backgroundColor: "#f3f4f6cc",
            }}
        >
            <span className="text-3xl font-semibold text-start w-full">
                Qr-Code Generator
            </span>
            <div
                ref={qrcodeRef}
                className="p-4 grid place-items-center aspect-square min-w-4/5 rounded-lg"
                style={{ backgroundColor: config.bgColor }}
            >
                <QrCode
                    value={
                        value.trim() === ""
                            ? "https://ravish-ranjan.github.io/qrcode"
                            : value.trim()
                    }
                    {...config}
                    className="code"
                />
            </div>
            <TextField
                label="Enter QrCode Value"
                value={value}
                className="w-full"
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <div className="flex justify-between w-full items-stretch">
                <TextField
                    value={config.fgColor}
                    type="color"
                    label="Qr Color"
                    className="w-1/2"
                    onChange={(e) => {
                        setCol({ ...config, fgColor: e.target.value });
                    }}
                />
                <TextField
                    value={config.bgColor}
                    type="color"
                    label="Background Color"
                    className="w-1/2"
                    onChange={(e) => {
                        setCol({ ...config, bgColor: e.target.value });
                    }}
                />
            </div>
            <Button
                disabled={value.trim() === ""}
                variant="contained"
                endIcon={<Download />}
                onClick={handleDownload}
                className="w-full"
            >
                Download
            </Button>
        </div>
    );
}

export default App;
