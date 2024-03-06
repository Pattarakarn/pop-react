import { useState, useEffect } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    LabelList,
} from "recharts";
export default function Barchart({ data, selectYear, isContinue }) {
    const [total, setTotal] = useState()
    useEffect(() => {
        if (data) {
            let sum = 0
            data.map(ele => {
                sum += +ele.Population
            })
            setTotal(sum)
        }
    }, [data])

    const renderCustomizedLabel = (props) => {
        const { x, y, width, height, value, index } = props;
        const radius = 13;
        let nf = new Intl.NumberFormat('en-US');
        // console.log(data[index].flag)
        const flag = data[index].flag
        return (
            <g>
                {/* <circle cx={x + width - 18} cy={y + height / 2} r={radius} fill="white" /> */}
                <text x={x + width - 18} y={y + height / 2+3} textAnchor="middle" dominantBaseline="middle" fontSize={24} >
                    {flag}
                </text>
                <text x={x + width + 50} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fontSize={14}>
                    {nf.format(value)}
                </text>
            </g>
        );
    };
    return (<>
        <div style={{ position: "relative" }}>
            <ResponsiveContainer width={'90%'} height={500}>
                <BarChart
                    data={data}
                    layout={'vertical'}
                    margin={{ top: 0, right: 0, bottom: 0, left: 120 }}
                >
                    <XAxis
                        type="number"
                        orientation="top"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={value => value.toLocaleString([])}
                        domain={[0, dataMax => (dataMax * 3.5)]}
                    />
                    <YAxis
                        dataKey="Country name"
                        type={'category'}
                        tickLine={false}
                        axisLine={false}
                    />
                    {/* <Tooltip /> */}
                    <CartesianGrid vertical={true} horizontal={false} />
                    <Bar dataKey='Population' isAnimationActive={!isContinue}>
                        <LabelList
                            // dataKey="Population"
                            content={renderCustomizedLabel}
                            position="right"
                            fill="initial"
                            formatter={value => value.toLocaleString([])}
                        // formatter={value => {return value.toLocaleString([])}}

                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            <div style={{
                position: "absolute",
                right: '50px',
                bottom: '0px',
                textAlign: 'right'
            }}>
                <p style={{ fontSize: "4rem", margin: 0 }}>{selectYear}</p>
                <h1 style={{ margin: "5px" }}>Total: {total?.toLocaleString()}</h1>
            </div>
        </div>
    </>

    )
}
