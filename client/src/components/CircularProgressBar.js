import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";


const CircularProgressBar = (props) => {
    const [valueEnd, setValueEnd] = React.useState(69);
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
                <div style={{ width: "60%" }}>
                    <ProgressProvider valueStart={0} valueEnd={valueEnd}>
                        {value => <CircularProgressbar
                            value={value}
                            text={`${value}%`}
                            styles={buildStyles({
                                pathColor: "#424E5B",
                                textColor: "#424E5B",
                            })}
                        />}
                    </ProgressProvider>
                </div>
            </div>
        </div>
    );
};

export default CircularProgressBar;
