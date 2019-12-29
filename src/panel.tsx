import React, {PureComponent} from 'react';
import {PanelProps} from '@grafana/data';
import {Options} from 'types';
import Plot from 'react-plotly.js';
import memorizeOne from 'memoize-one';
import moment from "moment";

interface Props extends PanelProps<Options> {

}

export class Panel extends PureComponent<Props> {
    parseFunction = memorizeOne((code: string) => {
        return eval(code).bind(this);
    });

    makeErrorDisplayElement = (text: string) => {
        return (
            <div style={{height: "100%", width: "100%", display: "table"}}>
                <div style={{display: "table-cell", textAlign: "center", verticalAlign: "middle"}}>{text}</div>
            </div>
        );
    };

    moment = moment;

    render() {
        const {data, width, height, options} = this.props;


        let displayElement;

        if (!data.series.length) {
            displayElement = this.makeErrorDisplayElement("No data");
        } else {
            let ret;
            try {
                const func = this.parseFunction(options.code);
                ret = func(data);
                const extraLayout = ret && ret.layout ? ret.layout : {};
                const layout = {
                    width,
                    height,
                    uirevision: 'true',
                    paper_bgcolor: "#161719",
                    plot_bgcolor: "#161719",
                    font: {
                        color: "white",
                    },
                    margin: {
                        b: 40,
                        l: 40,
                        r: 40,
                        t: 20,
                    },
                    ...extraLayout,
                };
                const plotData = ret && ret.data ? ret.data : [];
                displayElement = <Plot data={plotData} layout={layout}/>;
            } catch (e) {
                console.error(e);
                ret = null;
                displayElement = this.makeErrorDisplayElement(`Error: ${e.message}`);
            }
        }

        return (
            <div
                style={{
                    position: 'relative',
                    width,
                    height,
                }}
            >
                {displayElement}

            </div>
        );
    }
}
