export default function StatCard({ icon, label, value, change, positive }: any) {
    return (
        <div className="stat-card">
            <div className="sc-top">
                <div className="sc-icon">{icon}</div>
                <span className={`badge ${positive ? 'pos' : 'neg'}`}>
                    {change}
                </span>
            </div>
            <div className="sc-label">{label}</div>
            <div className="sc-value">{value}</div>
        </div>
    );
}