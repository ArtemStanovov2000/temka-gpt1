import { FC, useState } from "react"
import { createUseStyles } from "react-jss"
import { tokenizationText } from "./utils/tokenizator";
import { cleaningText } from "./utils/cleanSymbol";
import { splitText } from "./utils/splitText";
import { add_ } from "./utils/removeDuplicateWords";
import { embeddingMatrix } from "./data/matrix/embeddingMatrix";
import { positionMatrix } from "./data/matrix/positionMatrix";


const embeddings: number[][] = []
for (let i = 0; i < 128; i++) {
    const row = []
    for (let j = 0; j < 3; j++) {
        row.push(Math.random())
    }
    embeddings.push(row)
}


// Матрица Wq для одной головы: 128 строк × 8 столбцов
const Wq: number[][] = []
for (let i = 0; i < 128; i++) {
    const row = []
    for (let j = 0; j < 8; j++) {
        row.push(Math.random())
    }
    Wq.push(row)
}

// 2. Умножение Wq^T (8x128) × embeddings (128x3) = 8x3
function multiplyMatrices(aTransposed: number[][], b: number[][]) {
    const rowsA = aTransposed.length;    // 8
    const colsB = b[0].length;           // 3
    const result = Array(rowsA).fill().map(() => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < b.length; k++) {  // 128
                result[i][j] += aTransposed[i][k] * b[k][j];
            }
        }
    }
    return result;
}

// Транспонируем Wq для правильного порядка умножения (8x128)
const WqTransposed = Wq[0].map((_, i) => Wq.map(row => row[i]));

// Результат: матрица 8x3 (8 фич × 3 токена)
const queries = multiplyMatrices(WqTransposed, embeddings);

console.log(queries, "rr")












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