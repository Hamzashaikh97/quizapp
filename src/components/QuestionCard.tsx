import React, { useState } from 'react'
import { questionPropsType } from './../Types/quiz_types'


const QustionCard: React.FC<questionPropsType> = ({ question, options, callback }) => {

    // console.log(question, options)
    let [selectedAns, setselectedAns] = useState("")

    const handleSelection = (ev: any) => {
        // console.log(ev.target.value)
        setselectedAns(ev.target.value)

    }

    return (
        <div className={"question_Container"}>
            <div className={"question"}>
                <h2>{question}</h2>
            </div>

            <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
                className={"question-form"}
            >
                {
                    options.map((opt: string, ind: number) => {

                        return (
                            <div key={ind}>
                                <label className={"radio"}
                                >
                                    <input type="radio"
                                        required
                                        name="opt"
                                        value={opt}
                                        checked={selectedAns === opt}
                                        onChange={handleSelection}
                                    />
                                    {opt}
                                </label>
                            </div>
                        )
                    })
                }

                <input type="Submit" className={"submit"} />
            </form>
        </div>
    )

}

export default QustionCard;