import React from 'react';

const Maintenance = ({ style_, state=false }) => {
    return (
        <div style={style_ ? style_ : styles.container}>
            {state ? (
            <p>
            This page is under development, it might not function as expected.
            </p>
            ):(<></>)}
        </div>
    )
}

const styles = {
    container: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        textAlign: 'center',
        padding: '0.02rem 0',
        backgroundColor: '#f14848',
        zIndex: 10000,
    }
}

export default Maintenance;