import { FC, useState } from "react"
import { createUseStyles } from "react-jss"
import { tokenizationText } from "./utils/tokenizator";
import { cleaningText } from "./utils/cleanSymbol";
import { splitText } from "./utils/splitText";
import { add_ } from "./utils/removeDuplicateWords";
import { embeddingMatrix } from "./data/matrix/embeddingMatrix";
import { positionMatrix } from "./data/matrix/positionMatrix";

//console.log(W_Q_1layer)

const matrix = []
for (let i = 0; i < 128; i++) {
    const row = []
    for (let j = 0; j < 128; j++) {
        row.push(Math.random() * 0.1 - 0.05)
    }
    matrix.push(row)
}
console.log(JSON.stringify(matrix))

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