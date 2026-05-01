export default function MetricCard({ label, value, accent, red }: any) {
    return (
        <div className={`metric-card ${accent ? 'accent' : ''}`}>
            <div className="m-label">{label}</div>
            <div className={`m-val ${red ? 'red' : ''}`}>{value}</div>
        </div>
    );
}