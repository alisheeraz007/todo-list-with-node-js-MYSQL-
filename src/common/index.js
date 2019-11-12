export const goBack = (props,ev) => {  
        props.history.goBack();
}

export const changePath = (name, props) => {
    props.history.push(`/${name}`)
}