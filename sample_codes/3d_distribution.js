(data) => {
    const fields = data.series[0].fields;
    const x = [];
    const y = [];
    const z = [];

    const now = new Date().getTime();
    for (const t of fields[0].values.buffer) {
        x.push((t - now) / 1000);
    }
    for (const f of fields.slice(1)) {
        y.push(parseFloat(f.name));
        z.push(f.values.buffer);
    }
    return {
        layout: {
            scene: {
                xaxis: {title: {text: 'Time'}, ticksuffix: " s", showticksuffix: 'all', tickformat: '.1f'},
                yaxis: {title: {text: 'Size (um)'}},
                zaxis: {title: {text: 'Count'}}
            }
        },
        data: [{
            x,
            y,
            z,
            type: 'surface'
        }]
    }
};
