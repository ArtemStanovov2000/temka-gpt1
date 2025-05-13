import { FC, useState } from "react"
import { createUseStyles } from "react-jss"
import { tokenizationText } from "./utils/tokenizator";
import { cleaningText } from "./utils/cleanSymbol";
import { splitText } from "./utils/splitText";
import { add_ } from "./utils/removeDuplicateWords";
import { embeddingMatrix } from "./data/matrix/embeddingMatrix";
import { positionMatrix } from "./data/matrix/positionMatrix";
import { W_Q_1layer } from "./data/matrix/layer_1/W_Q_1layer";


const text = [
    [-0.92, -0.78, 0.98, 0.04, -0.21, -0.22],
    [0.15, -0.74, 0.58, 0.09, -0.25, -0.95],
    [0.9, 0.57, -0.13, 0.2, 0.9, 0.62]
]

const matrix = [
    [-0.38, 0.29, -0.58, 0.86, 0.59, -0.4],
    [0.3, 0.71, -0.05, -0.57, 0.83, 0.69] 
]


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
        console.log(JSON.stringify(add_(splitText(cleaningText(text)))))
    }

    return (
        <div className={classes.page}>
            <div className={classes.inputBox}>
                <input onInput={inputText} value={text} placeholder="text" className={classes.input} />
                <button onClick={postText} className={classes.button}>Ввод</button>
            </div>
            <p>{text}</p>
        </div>
    )
}

export default MainPage