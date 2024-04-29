var currentBoard = null;

const deleteModal = document.getElementById('deleteModal')

deleteModal.addEventListener('shown.bs.modal', event => {
    const button = event.relatedTarget
    currentBoard = button.getAttribute('data-id')
})

function deleteBoard() {
    const board = document.getElementById(currentBoard)
    board.remove()
}
