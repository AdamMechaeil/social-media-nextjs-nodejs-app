import { useFormik } from 'formik'
import React, { useRef } from 'react'

export const Form = ({ formData, setFormData, handleSubmit,ref,edit}) => {
  return (
    <>
      {
        edit==false ? (
          <div className='my-3 container p-2' style={{ width: "400px" }}>
            <form ref={ref}>
              <div className="form-outline">
                <label className="form-label" for="firstName">Add Title</label>
                <input type="text" id="title" className="form-control" onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev, title: e.target.value
                    }
                  })
                }} />
              </div>

              <div className="form-outline">
                <label className="form-label" for="firstName">Add Caption</label>
                <input type="text" id="caption" className="form-control" onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev, caption: e.target.value
                    }
                  })
                }} />
              </div>
              <div className="form-outline">
                <label className="form-label" for="firstName">Add Image</label>
                <input type="file" id="image" className="form-control"

                  onChange={(e) => {
                    const image = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.addEventListener('load', (e) => {
                      setFormData((prev) => {
                        return {
                          ...prev, image: e.target.result
                        }
                      })
                    })
                  }}
                />
              </div>
              <div className='my-3'>
                <img src={formData?.image} alt="Upload An image" style={{ width: "400px", height: "400px" }} />
              </div>
              <div className="form-outline">
                <label className="form-label" for="firstName">Add Tags</label>
                <input type="text" id="tags" className="form-control" onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev, tags: e.target.value.split(",")
                    }
                  })
                }} />
              </div>
            </form>
            <button className="btn btn-success mt-3" id="submitBtn" onClick={() => {
              handleSubmit()
            }}>Submit</button>
          </div>) : 
          <>
          <div className='my-3 container p-2' style={{ width: "400px" }}>
            <form ref={ref}>
              <div className="form-outline">
                <label className="form-label" for="firstName">Add Title</label>
                <input type="text" id="title"  value={formData.title}  className="form-control" onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev, title: e.target.value
                    }
                  })
                }} />
              </div>

              <div className="form-outline">
                <label className="form-label" for="firstName">Add Caption</label>
                <input type="text" id="caption" value={formData.caption} className="form-control" onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev, caption: e.target.value
                    }
                  })
                }} />
              </div>
              <div className="form-outline">
                <label className="form-label" for="firstName">Add Image</label>
                <input type="file" id="image" className="form-control"

                  onChange={(e) => {
                    const image = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.addEventListener('load', (e) => {
                      setFormData((prev) => {
                        return {
                          ...prev, image: e.target.result
                        }
                      })
                    })
                  }}
                />
              </div>
              <div className='my-3'>
                <img src={formData.image} alt="Upload An image" style={{ width: "400px", height: "400px" }} />
              </div>
              <div className="form-outline">
                <label className="form-label" for="firstName">Add Tags</label>
                <input type="text" id="tags" value={formData.tags} className="form-control" onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev, tags: e.target.value.split(",")
                    }
                  })
                }} />
              </div>
            </form>
            <button className="btn btn-success mt-3" id="submitBtn" onClick={() => {
              handleSubmit()
            }}>Submit</button>
          </div>
        </>
      }
    </>
  )
}
