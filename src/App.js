import { useRef, useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
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
			download(dataUrl, `qrcode_${value.replace(" ", "_")}.png`);
		});
	};

	return (
		<div className="card">
			<Typography variant="h4" className="heading">
				Qr-Code Generator
			</Typography>
			<div
				style={{
					width: "100%",
					height: "auto",
					overflowX: "auto",
					display: "grid",
					placeItems: "center",
					outline: "1px solid black",
					borderRadius: ".5rem",
					padding:"1rem"
				}}
				ref={qrcodeRef}
			>
				<QrCode
					value={value === "" ? "qrcode" : value}
					{...config}
					className="code"
				/>
			</div>
			<TextField
				label="Enter QrCode Value"
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
			<div className="inline">
				<TextField
					value={config.fgColor}
					type="color"
					label="Qr Color"
					className="color"
					onChange={(e) => {
						setCol({ ...config, fgColor: e.target.value });
					}}
				/>
				<TextField
					value={config.bgColor}
					type="color"
					label="Background Color"
					className="color"
					onChange={(e) => {
						setCol({ ...config, bgColor: e.target.value });
					}}
				/>
			</div>
			<Button
				disabled={value === ""}
				variant="contained"
				endIcon={<Download />}
				onClick={handleDownload}
			>
				Download
			</Button>
		</div>
	);
}

export default App;
