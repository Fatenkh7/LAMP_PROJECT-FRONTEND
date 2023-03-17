import React, { useState } from "react";
import "./reports.css";
import { CSSTransition } from "react-transition-group";

function Report(props) {
    const [report, setReport] = useState(false);
    const [padding, setPadding] = useState("20px");


    const visible = () => {
        if (report === false || padding === "20px") {
            setReport(true);
            setPadding(0);
        } else {
            setReport(false);
            setPadding("20px");
        }
    };

    return (
        <div>
        <div className="card-report" onMouseEnter={visible} onMouseLeave={visible}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: `${padding}`,
                }}
            >
                <div className="title-report">
                    <h3>Report : {props.report}</h3>
                    <h4>Type : {props.type}</h4>
                </div>
            </div>

            {report && (
                <div className="more-info">
                    <p>
                        <strong>admin : </strong>
                        {props.admin}
                    </p>
                    <p>
                        <strong>category : </strong>
                        {props.category}
                    </p>
                    <p>
                        <strong>Start date : </strong>
                        {props.start_date}
                    </p>
                    <p>
                        <strong>End date : </strong>
                        {props.end_date}
                    </p>
                </div>
            )}
        </div>
        </div>
    );
}

export default Report;
