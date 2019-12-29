import React, {PureComponent} from 'react';
import {PanelProps} from '@grafana/data';
import {Options} from 'types';
import Plot from 'react-plotly.js';
import memorizeOne from 'memoize-one';

interface Props extends PanelProps<Options> {

}

export class Panel extends PureComponent<Props> {
    parseFunction = memorizeOne((code: string) => {
      return eval(code);
    });

    render() {
        const {data, width, height, options} = this.props;

        let ret;
        let err = false;
        try {
            const func = this.parseFunction(options.code);
            ret = func(data);
        } catch (e) {
            console.error(e);
            ret = null;
            err = true;
        }

        const extraLayout = ret && ret.layout ? ret.layout : {};
        const layout = {
            width,
            height,
            uirevision:'true',
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

        return (
            <div
                style={{
                    position: 'relative',
                    width,
                    height,
                }}
            >
                {err ? "Error occured" : <Plot data={plotData} layout={layout}/>}

            </div>
        );
    }
}
