import css from './experienceItem.scss'
function ExperienceItem ({content, title , date}) {
    return <div className={css.experience_item}>
    <div className={css.leftSide}>
        <img src="/timeLineCircle.svg" alt="circle" />
        <div className={css.line} >
            <div />
        </div>
    </div>
    <div className={css.rightSide}>
        <div className={css.itemTitle}>
            <span>{title}</span> <span className={css.date}>({date})</span>
        </div>
        <div className={css.itemDescription}>
            {content}
        </div>
    </div>
</div> 
}

export default ExperienceItem