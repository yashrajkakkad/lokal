import React from "react";
// Import react-circular-progressbar module and styles
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";


const CircularProgressBar = (props) => {
    const [valueEnd, setValueEnd] = React.useState(69);
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
                <div style={{ width: "60%" }}>
                    <ProgressProvider valueStart={10} valueEnd={valueEnd}>
                        {value => <CircularProgressbar
                            value={value}
                            text={`${value}%`}
                            styles={buildStyles({
                                pathColor: "#4a83fe",
                                textColor: "#4a83fe",
                            })}
                        />}
                    </ProgressProvider>
                    {/* <button onClick={() => setValueEnd(0)}>Change valueEnd</button> */}
                </div>
            </div>
        </div>

    );
};

export default CircularProgressBar;
