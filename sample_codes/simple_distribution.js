(data) => {
    const fields = data.series[0].fields;
    const x = [];
    const y = [];
    for (const f of fields.slice(1)) {
        x.push(parseFloat(f.name));
        y.push(f.values.buffer[f.values.length - 1])
    }
    return {
        layout: {
            xaxis: {title: {text: "Size (um)"}, type: "log"},
            yaxis: {title: {text: "Count"}}
        },
        data: [{
            x,
            y,
            type: 'scatter',
            mode: 'lines',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
            }]
        }]
    }
};
