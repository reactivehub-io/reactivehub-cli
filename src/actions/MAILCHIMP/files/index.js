import folders from './folders'
import file from './file'

export default {
  name: 'FILES',
  actions: [
    folders.CREATE_FILE_FOLDER,
    folders.EDIT_FILE_FOLDER,
    folders.DELETE_FILE_FOLDER,
    file.CREATE_FILE,
    file.EDIT_FILE,
    file.DELETE_FILE,
  ],
}
