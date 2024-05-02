function TimerSettings({ children}) {
    return (
        <div className="setting col-sm-6">
            <h2 className="setting-title">{children}</h2>
            <i class="bi bi-arrow-left-circle"></i>
            <span> 25 </span>
            <i class="bi bi-arrow-right-circle"></i>
        </div>
    );
}

export default TimerSettings;