import React, {useState} from 'react';
import './styles.scss';

const DarkMode = () => {
    const [value, setValue] = useState('Темная Тема');


    let clickedClass = 'clicked';
    const body = document.body;
    const lightTheme = "light";
    const darkTheme = "dark";

    let theme;

    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    if (theme === lightTheme || theme === darkTheme) {
        body.classList.add(theme);
    } else {
        body.classList.add(lightTheme);
    }

    const switchTheme = (e) => {
        if (theme === darkTheme) {
            body.classList.replace(darkTheme, lightTheme);
            e.target.classList.remove(clickedClass);
            localStorage.setItem("theme", "light");
            theme = lightTheme;
            setValue('Темная Тема')
        } else {
            body.classList.replace(lightTheme, darkTheme);
            e.target.classList.add(clickedClass);
            localStorage.setItem("theme", "dark");
            theme = darkTheme;
            setValue('Светлая Тема')
        }
    };

    return (
        <div className="theme">
            <p onClick={(e) => switchTheme(e)}>{value}</p>
        </div>
    );
};

export default DarkMode;