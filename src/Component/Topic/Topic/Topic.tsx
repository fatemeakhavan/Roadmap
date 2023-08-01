import {useGetTopic} from "../../../Hook/Topic/usegetTopic";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DescriptionTopic} from "../DescriptionBYTopic/DescriptionTopic";
import "../styles.css";
import ReactFlow, {Position, useEdgesState, useNodesState,} from 'reactflow';
import {ITopicGet} from "../../../Interface/TopicGet.interface";
import {useGetDescriptionByTopic} from "../../../Hook/Topic/useDescriptionByTopic";

export const Topic = () => {

    const {courseId} = useParams();
    const getTopicHook = useGetTopic(courseId);
    const [nodeId, setNodeId] = useState<number | null>(0);
    const descriptionTopicHook = useGetDescriptionByTopic(nodeId);

    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    let topics: ITopicGet[] = [];
    if (getTopicHook?.data) {
        // @ts-ignore
        topics = [getTopicHook.data];
    }

    const handleClose = () => {
        setNodeId(null);
        descriptionTopicHook.refetch();
    }
    const handleNodeClick = (event: any, node: any) => {
        const id = node.id.slice(0, node.id.length - 1);
        setNodeId(id);
    }

    const checkIsLeft = (previous: any) => {
        return previous?.length >= 3 && previous?.length < 6;
    }

    useEffect(() => {

        const initialNodes: any[] = [];
        const initialEdges: any[] = [];
        const yValue = 60;
        const yyValue = 120;
        let extraDistance = 0;

        topics?.map((levelOne, index) => {
            const node = {
                id: `${levelOne.id.toString()}h`,
                position: {x: 0, y: yValue},
                data: {label: levelOne.name},
                type: "input",
                style:styles.nodeLevelOne
            }
            initialNodes.push(node);
            levelOne.children
                .sort((a, b) => a.order - b.order)
                .map((levelTwo, iindex) => {
                    const nodePosition = yyValue + 70 * iindex;
                    const yValueChild = nodePosition - ((levelTwo.children.length - 1) * 20) / 2 - 5;
                    const hasLeftChildren = checkIsLeft(levelOne?.children[iindex - 1]?.children) && !checkIsLeft(levelOne?.children[iindex - 2]?.children);

                    if ((levelOne as any)?.children[iindex - 1]?.children?.length >= 6)
                        extraDistance += ((levelOne as any)?.children[iindex - 1]?.children?.length - 4) * 15;

                    if (levelTwo.children?.length > 0) {
                        if (levelTwo?.children?.length >= 6) {
                            const leftNode = {
                                id: `${levelTwo.id.toString()}L`,
                                position: {x: 0, y: yyValue + extraDistance + 70 * iindex},
                                data: {label: levelTwo.name},
                                type: "input",
                                sourcePosition: Position.Right,
                                style: styles.nodeParent
                            }
                            const rightNode = {
                                id: `${levelTwo.id.toString()}R`,
                                position: {x: 0, y: yyValue + extraDistance + 70 * iindex},
                                data: {label: levelTwo.name},
                                type: "input",
                                sourcePosition: Position.Left,
                                style: styles.nodeParent
                            }
                            initialNodes.push(leftNode);
                            initialNodes.push(rightNode);
                        } else {
                            const node = {
                                id: `${levelTwo.id.toString()}c`,
                                position: {x: 0, y: yyValue + extraDistance + 70 * iindex},
                                data: {label: levelTwo.name},
                                type: "input",
                                sourcePosition: hasLeftChildren ? Position.Left : Position.Right,
                                style: styles.nodeParent
                            }
                            initialNodes.push(node)
                        }
                    }

                    const node = {
                        id: `${levelTwo.id.toString()}o`,
                        position: {x: 0, y: yyValue + extraDistance + 70 * iindex},
                        data: {label: levelTwo.name},
                        type: 'output',
                        targetPosition: 'top',
                        style: styles.nodeParent
                    }
                    initialNodes.push(node)

                    if (iindex < levelOne.children.length - 1) {
                        const node2 = {
                            id: `${levelTwo.id.toString()}i`,
                            position: {x: 0, y: yyValue + extraDistance + 70 * iindex},
                            data: {label: levelTwo.name},
                            type: "input",
                            sourcePosition: 'bottom',
                            style: styles.nodeParent
                        }
                        initialNodes.push(node2)
                    }

                    if (iindex === 0) {
                        const edge = {
                            id: `e${levelOne.id}-${levelTwo.id}`,
                            source: `${levelOne.id.toString()}h`,
                            target: `${levelTwo.id.toString()}o`,
                        }
                        initialEdges.push(edge);
                    } else {
                        const edge = {
                            id: `e${levelOne.children[iindex - 1].id}-${levelTwo.id}`,
                            source: `${levelOne.children[iindex - 1].id.toString()}i`,
                            target: `${levelTwo.id.toString()}o`,

                        }
                        initialEdges.push(edge);

                    }
                    levelTwo.children
                        .sort((a, b) => a.order - b.order)
                        .map((levelThree, iiindex) => {

                            const xAxis = hasLeftChildren ? -200 : 200;
                            const xAxisLevelFour = hasLeftChildren ? -350 :350;

                            if (levelTwo?.children?.length >= 6) {
                                const children = [...levelTwo?.children];
                                const firstHalf = children.slice(0, levelTwo?.children?.length / 2);
                                const secondHalf = children.slice(levelTwo?.children?.length / 2);

                                firstHalf.forEach((item, cindex) => {
                                    const nodeChild = {
                                        id: `${item.id.toString()}o`,
                                        position: {x: 200, y: yValueChild + extraDistance + 30 * cindex},
                                        data: {label: item.name},
                                        type: "output",
                                        targetPosition: Position.Left,
                                        style: styles.nodeChild
                                    }
                                    initialNodes.push(nodeChild)
                                    const edge = {
                                        id: `e${levelTwo.id}-${item.id}`,
                                        source: `${levelTwo.id.toString()}L`,
                                        target: `${item.id.toString()}o`,
                                        animated: true,
                                    }
                                    initialEdges.push(edge);
                                })
                                secondHalf.forEach((item, cindex) => {
                                    const nodeChild = {
                                        id: `${item.id.toString()}o`,
                                        position: {x: -200, y: yValueChild + extraDistance + 30 * cindex},
                                        data: {label: item.name},
                                        type: "output",
                                        targetPosition: Position.Right,
                                        style: styles.nodeChild
                                    }
                                    initialNodes.push(nodeChild)
                                    const edge = {
                                        id: `e${levelTwo.id}-${item.id}`,
                                        source: `${levelTwo.id.toString()}R`,
                                        target: `${item.id.toString()}o`,
                                        animated: true,
                                    }
                                    initialEdges.push(edge);
                                })
                            } else {
                                const nodeChild = {
                                    id: `${levelThree.id.toString()}o`,
                                    position: {x: xAxis, y: yValueChild + extraDistance + 30 * iiindex},
                                    data: {label: levelThree.name},
                                    type: "output",
                                    targetPosition: hasLeftChildren ? Position.Right : Position.Left,
                                    style: styles.nodeChild
                                }
                                initialNodes.push(nodeChild)
                                const edge = {
                                    id: `e${levelTwo.id}-${levelThree.id}`,
                                    source: `${levelTwo.id.toString()}c`,
                                    target: `${levelThree.id.toString()}o`,
                                    animated: true,
                                }
                                initialEdges.push(edge);
                            }


                            levelThree.children
                                .sort((a, b) => a.order - b.order)
                                .map((levelFour,iiiindex)=>{
                                    const nodeChild = {
                                        id: `${levelFour.id.toString()}4`,
                                        position: {x: xAxisLevelFour, y: yValueChild + extraDistance + 30 * iiiindex},
                                        data: {label: levelFour.name},
                                        type: "output",
                                        targetPosition: hasLeftChildren ? Position.Right : Position.Left,
                                        style: styles.nodeChild
                                    }
                                    initialNodes.push(nodeChild)
                                    const edge = {
                                        id: `e${levelThree.id}-${levelFour.id}`,
                                        source: `${levelThree.id.toString()}o`,
                                        target: `${levelFour.id.toString()}4`,
                                        animated: true,
                                    }
                                    initialEdges.push(edge);

                                })




                        })
                })
        })

        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [getTopicHook.data])


    return (
        <>
            {
                topics.length > 0 ?

                    <div style={{height: '100vh', direction: "ltr"}}>
                        <ReactFlow nodes={nodes} edges={edges} fitView zoomOnScroll={false} zoomOnPinch={false}
                                   panOnDrag={false}
                                   onNodeClick={handleNodeClick}
                                   nodesConnectable={false}/>

                    </div>

                    : (

                        <div style={{textAlign: "center", marginTop: "300px", height: "100vh"}}>
                            <img style={{width: "450px", borderRadius: "25px"}}
                                 src={require("../../../Assets/images/error-404-not-found-1024x512.png")}/>
                            <h2 style={{color: "#9C27B0"}}>موضوعی یافت نشد</h2>
                        </div>


                    )}
            {nodeId ? <DescriptionTopic topicId={nodeId} handleClose={handleClose}/> : null}

        </>


    )

}

const styles = {
    nodeLevelOne:{
        background: 'transparent',
        border: 'none'
        , color: '#009688',
        boxShadow: 'none'
    },
    nodeParent: {
        width: 90,
        padding: 6,
        lineBreak: 'anywhere',
        fontSize: 11,
        borderRadius: 7,
        background: '#D4FCF0',

    },
    nodeChild: {
        display: '-webkit-box',
        overflow: 'hidden',
        webkitLineClamp: 1,
        webkitBoxOrient: 'vertical',
        minWidth: 100,
        maxWidth: 150,
        width: 'fit-content',
        padding: 3,
        lineBreak: 'anywhere',
        fontSize: 10,
        borderRadius: 7,
        background: '#A2E1DB',



    }
}