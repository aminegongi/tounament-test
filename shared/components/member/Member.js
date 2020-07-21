import css from './member.scss'

export default function member({ name,job,description,img,el,firstName,lastName,icon }) {

    return (
    <div className={css.presentationequipe__presentationmemeber}>
        <img className={css.presentationequipe__presentationmemeber__img} src={img ? img : "../icon/DirecteurG.png"} alt="member" />
        <div className={css.presentationequipe__presentationmemeber__name}>{firstName+" "+lastName}</div>
        <div className={css.presentationequipe__presentationmemeber__poste}>{job}</div>
        <img className={css.presentationequipe__presentationmemeber__icon} src={icon} alt="alt"></img>
        {/* <div className={css.presentationequipe__presentationmemeber__ligne}>_______</div>
        <div className={css.presentationequipe__presentationmemeber__description}>{description}</div> */}
    </div>
    );
}