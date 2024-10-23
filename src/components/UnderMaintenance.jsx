import React from 'react';

const Maintenance = ({ state=false }) => {
    return (
        <div style={styles.container}>
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
        width: '100%',
        textAlign : 'center',
        padding: '0.02rem 0',
        backgroundColor: '#f14848',
        zIndex: 10000,
    }
}

export default Maintenance;