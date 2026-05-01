export default function ChartBar() {
    const data = [
        { day: 'MON', val: 52 },
        { day: 'TUE', val: 72 },
        { day: 'WED', val: 48 },
        { day: 'THU', val: 82 },
        { day: 'FRI', val: 60 },
        { day: 'SAT', val: 100 },
        { day: 'SUN', val: 88 },
    ];

    return (
        <div className="chart-area">
            {data.map((d) => (
                <div key={d.day} className="bar-wrap">
                    <div
                        className="bar"
                        style={{ height: `${d.val}%` }}
                    />
                    <div className="bar-lbl">{d.day}</div>
                </div>
            ))}
        </div>
    );
}