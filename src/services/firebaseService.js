import firebase from 'firebase'

export default {
  async getFileList(patientId) {
    const storage = firebase.storage()
    const storageRef = storage.ref(`clinica/pacientes`)
    var listRef = storageRef.child(`/${patientId}/images/`)
    let files = await listRef.list({ maxResults: 100 })
    return files.items
  },

  getFileUrls(files) {
    const storage = firebase.storage()
    console.log('storage', files)

    let downloads = files.map(url => {
      console.log('fullPath', url.fullPath)
      return url.fullPath
    })

    console.log('downloadUrls', downloads[0])

    const downloadRef = storage.ref(downloads[0])
    console.log('downloadref', downloadRef)
    downloadRef
      .getDownloadURL()
      .then(url => {
        console.log('url firebase', url)
        return url
      })
      .catch(error => {
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
      })
  }
}
