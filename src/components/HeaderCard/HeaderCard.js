import clsx from 'clsx';
import Styles from './HeaderCard.module.css';

function HeaderCard(props) {
    return ( <>
        <div className={clsx(Styles.HeaderCard_Size)}>
            <div>
                <h1>{props.text}</h1>
            </div>
            <p></p>
        </div>
    </> );
}

export default HeaderCard;