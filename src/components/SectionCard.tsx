export default function SectionCard({ title, icon, children }: any) {
    return (
        <div className="section-card">
            <div className="sec-hdr">
                <div className="sec-icon">{icon}</div>
                <div className="sec-title">{title}</div>
            </div>

            <div className="metric-grid">{children}</div>
        </div>
    );
}