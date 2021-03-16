import firebase from 'firebase'

export default {
  async getFileList(patientId) {
    const storage = firebase.storage()
    const storageRef = storage.ref(`clinica/pacientes`)
    var listRef = storageRef.child(`/${patientId}/images/`)
    let files = await listRef.list({ maxResults: 100 })
    return files.items
  },

  async getFileUrls(files) {
    try {
      const storage = firebase.storage()
      let downloads = files.map(url => storage.ref(url.fullPath))

      return await Promise.all(
        downloads.map(async d => await d.getDownloadURL())
      )
    } catch (error) {
      console.log(error)
      switch (error.code) {
        case 'storage/object-not-found':
          console.log('Not found', error.code)
          break
        case 'storage/unauthorized':
          console.log('Unauthorized', error.code)
          break
        case 'storage/canceled':
          console.log('Canceled', error.code)
          break
        case 'storage/unknown':
          console.log('Unknown', error.code)
          break
      }
    }
  }
}
