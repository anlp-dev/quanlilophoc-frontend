import { CSSTransition } from 'react-transition-group';
import '../../static/css/styles.css';  // Tạo một file CSS để định nghĩa hiệu ứng

const PageTransition = ({ children }) => {
    return (
        <CSSTransition timeout={300} classNames="fade">
            <div>{children}</div>
        </CSSTransition>
    );
};

export default PageTransition;
