import { useState } from "react"
import * as React from 'react';
import Slider from '@mui/material/Slider';
import { useEffect } from "react";
import Barchart from "./barchart";

export default function GraphComponent({ data, minYear, maxYear }) {
    const [isContinue, setIsContinue] = useState(false)
    const [mark, setMark] = useState(false)
    const [selectYear, setSelectYear] = useState(false)
    const [dataBar, setDataBar] = useState()

    useEffect(() => {
        if (data) {
            const marks = []
            data?.map((ele, ind) => {
                const year = Object.keys(ele)[0]

                if (ind % 4 === 0) {
                    marks.push({ value: year, label: year })
                }
            })
            setMark(marks)
            setSelectYear(Object.keys(data[0])[0])
            setDataForBarChart()
        }
    }, [data])

    function valuetext(value) {
        setSelectYear(value)
        // return `${value}.`;
    }

    function valueLabelFormat(value) {
        // return mark?.findIndex((mark) => mark.value === value) + 1;
    }

    useEffect(() => {
        if (isContinue) {
            setSelectYear(selectYear + 1)
            setDataForBarChart(selectYear + 1)
        }
    }, [isContinue])

    useEffect(() => {
        const nextSelectYear = selectYear + 1
        if (isContinue) {
            setDataForBarChart(nextSelectYear)
        } else {
            setDataForBarChart(selectYear)
        }
        setTimeout(() => {
            if (isContinue) {
                if(nextSelectYear > maxYear) {
                    setSelectYear(+minYear)
                } else {
                    setSelectYear(nextSelectYear)
                }
            }
        }, 500);
    }, [selectYear])

    function setDataForBarChart(year) {
        if (data) {
            const dataYear = data?.find(el => Object.keys(el)[0] == (year || selectYear))
            if (dataYear) {
                const dataSlice = dataYear[year || selectYear]?.slice(0, 10)
                dataSlice.map(ele => {
                    ele.fill = color_set[ele['Country name']]
                    return ele
                })
                setDataBar(dataSlice)
            }
        }
    }

    const color_set = {
        World: "orange",
        ['Less developed regions']: "gray",
        ['Asia (UN)']: "cornsilk",
        ['Upper-middle-income countries']: "#8884d8",
        ['More developed regions']: "#82ca9d",
        ['Lower-middle-income countries']: "lightslategray",
        ['High-income countries']: "lightpink",
        ['Lower-middle-income countries']: "lightblue",
        ['Europe (UN)']: "navy",
        China: "lightcoral",
        India: "brown",
    }
    return (
        <div>
            <Barchart
                data={dataBar}
                selectYear={selectYear}
                isContinue={isContinue}
            />

            <div
                style={{
                    display: 'flex',
                    justifyContent: "center",
                    width: "100%",
                    margin: "25px 0"
                }}
            >
                <button className="button-start-stop"
                    onClick={() => setIsContinue(!isContinue)}
                >
                    {isContinue
                        ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" /></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                    }
                </button>

                <Slider
                    color='primary'
                    track={false}
                    min={+minYear}
                    max={+maxYear}
                    step={1}
                    marks={mark}
                    value={selectYear}
                    onChange={e => {
                        setIsContinue(false);
                        setSelectYear(e.target.value);
                    }}
                    getAriaValueText={valuetext}
                />
            </div>
        </div>
    )
}
