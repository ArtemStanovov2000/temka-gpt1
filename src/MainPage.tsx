import { FC, useState } from "react"
import { createUseStyles } from "react-jss"
import { createToken } from "./model/createToken";
import { GELU } from "./model/FFN/Gelu";

console.log(GELU(1))

const useStyles = createUseStyles({
    page: {
        backgroundColor: "#1E1E1E",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    inputBox: {
    },
    input: {
        fontSize: "20px",
        border: "none",
        width: "80%",
        height: "50px",
        margin: "20px",
        paddingLeft: "20px"
    },
    button: {
        fontSize: "20px",
        height: "52px",
        border: "none",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: "#909090",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#d4d4d4",
        },
        "&:active": {
            cursor: "pointer",
            backgroundColor: "#ffffff",
        },
    },
});

export const MainPage: FC = () => {
    const classes = useStyles()
    const [text, setText] = useState("");

    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const postText = () => {
        setText(text.toLowerCase())
        console.log(createToken(text))
        setText("")
    }

    return (
        <div className={classes.page}>
            <div className={classes.inputBox}>
                <input onInput={inputText} value={text} placeholder="text" className={classes.input} />
                <button onClick={postText} value={text} className={classes.button}>Ввод</button>
            </div>
            <p>{text}</p>
        </div>
    )
}

export default MainPage