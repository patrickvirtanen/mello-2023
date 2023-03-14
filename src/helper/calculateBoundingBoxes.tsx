import React from "react"

const calculateBoundingBoxes = (children: any) => {
  const boundingBoxes: any = {}
  if (children) {
    // console.log("ächilre", children)
    children.forEach((child: any) => {
      // console.log("ächilre", child)
      const domNode = child.ref.current
      console.log("dom", domNode)
      if (domNode) {
        const nodeBoundingBox = domNode.getBoundingClientRect()

        boundingBoxes[child.key] = nodeBoundingBox
      }
    })
  }
  return boundingBoxes
}

export default calculateBoundingBoxes
