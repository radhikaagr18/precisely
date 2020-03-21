function set_load_screen() {
    $('#module1-panel').loadingModal({
    
        position: 'auto',
        text: 'Loading...',
        color: '#fff',
        opacity: '0.5',
        backgroundColor: 'black',
        animation: 'wave',
        height:'800',width:'100%',
    });
}

function destroy_load_screen() {
    $('#module1-panel').loadingModal('destroy');
}
  