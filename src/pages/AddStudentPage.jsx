import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc, Timestamp, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import "../styles/AddStudent.css";

const validateStudent = (student) => {
  const errors = {};
  const requiredFields = [
    "studentId", "candidateName", "candidateNumber",
    "college", "course", "whatsappNumber", "dob",
    "gender", "fatherName", "parentNumber", "adhaarNumber",
    "candidateEmail", "reference.userType",
    "address", "motherName", "motherNumber",
    "religion", "state", "district", "pincode"
  ];

  requiredFields.forEach((key) => {
    if (key.startsWith("reference.")) {
      const field = key.split(".")[1];
      if (!student.reference?.[field]) {
        errors[key] = "This field is required.";
      }
    }
    else if (!student[key]) {
      errors[key] = "This field is required.";
    }
  });

  if (student.studentId && !/^\d+$/.test(student.studentId)) {
    errors.studentId = "Student ID should contain only numbers.";
  }

  if (student.candidateNumber && !/^\d{10}$/.test(student.candidateNumber)) {
    errors.candidateNumber = "Enter a valid 10-digit number.";
  }

  if (student.parentNumber && !/^\d{10}$/.test(student.parentNumber)) {
    errors.parentNumber = "Enter a valid 10-digit number.";
  }

  if (student.whatsappNumber && !/^\d{10}$/.test(student.whatsappNumber)) {
    errors.whatsappNumber = "Enter a valid 10-digit number.";
  }

  if (student.adhaarNumber && !/^\d{12}$/.test(student.adhaarNumber)) {
    errors.adhaarNumber = "Enter a valid 12-digit Aadhaar number.";
  }

  if (student.motherNumber && !/^\d{10}$/.test(student.motherNumber)) {
    errors.motherNumber = "Enter a valid 10-digit number.";
  }

  if (student.pincode && !/^\d{6}$/.test(student.pincode)) {
    errors.pincode = "Enter a valid 6-digit pincode.";
  }

  return errors;
};

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <svg className="modal-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-12h2v10h-2V5z"
            />
          </svg>
          <h2 className="modal-title">{message.name}</h2>
        </div>
        <div className="modal-body">
          <p className="modal-text">{message.text}</p>
        </div>
        <div className="modal-footer">
          <button
            className="modal-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const AddStudent = () => {
  const [student, setStudent] = useState({
    studentId: "",
    candidateName: "",
    candidateNumber: "",
    candidateEmail: "",
    college: "",
    course: "",
    whatsappNumber: "",
    dob: "",
    gender: "",
    fatherName: "",
    parentNumber: "",
    alternativeNumber: "",
    adhaarNumber: "",
    address: "",
    motherName: "",
    motherNumber: "",
    religion: "",
    state: "",
    district: "",
    pincode: "",
    plusTwoRegNumber: "",
    stream: "",
    plusTwoSchoolName: "",
    plusTwoSchoolPlace: "",
    lastQualification: "",
    lastQualificationMarks: "",
    totalAmountPaid: "",
    paymentRemark: "",
    createdBy: "",
    reference: {
      userType: "",
      userName: "",
      consultancyName: ""
    }
  });

  const [formErrors, setFormErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ name: "", text: "" });
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const snapshot = await getDocs(collection(db, "blr-college"));
        const options = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          courses: doc.data().courses || [],
        }));
        setCollegeOptions(options);
      } catch {
        toast.error("Failed to load colleges.");
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("reference.")) {
      const field = name.split(".")[1];
      setStudent(prev => ({
        ...prev,
        reference: {
          ...prev.reference,
          [field]: value
        }
      }));
    }
    else if (name === "college") {
      const selected = collegeOptions.find((c) => c.name === value);
      setCourseOptions(selected?.courses || []);
      setStudent((prev) => ({ ...prev, course: "", [name]: value }));
    }
    else {
      setStudent((prev) => ({ ...prev, [name]: value }));
    }

    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleVerify = async () => {
    const id = student.studentId.trim();

    if (!id || !/^\d+$/.test(id)) {
      setFormErrors({ studentId: "Please enter a valid numeric Student ID." });
      return;
    }

    const docSnap = await getDoc(doc(db, "km-blr", id));
    if (docSnap.exists()) {
      const data = docSnap.data();
      setModalMessage({ name: data.candidateName, text: "Student ID already exists." });
      setIsModalOpen(true);
    } else {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== 2) return;

    const errors = validateStudent(student);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setModalMessage({ name: "Validation", text: "Please correct the errors." });
      setIsModalOpen(true);
      return;
    }

    setSubmissionStatus("loading");

    const studentData = {
      ...student,
      applicationStatus: "enquiry",
      createdAt: Timestamp.now(),
      createdBy: "student"
    };

    try {
      await setDoc(doc(db, "km-blr", student.studentId), studentData);
      setSubmissionStatus("idle");
      setModalMessage({ name: student.candidateName, text: "Student successfully enrolled!" });
      setIsModalOpen(true);
      setStudent({
        studentId: "",
        candidateName: "",
        candidateNumber: "",
        candidateEmail: "",
        college: "",
        course: "",
        whatsappNumber: "",
        dob: "",
        gender: "",
        fatherName: "",
        parentNumber: "",
        alternativeNumber: "",
        adhaarNumber: "",
        address: "",
        motherName: "",
        motherNumber: "",
        religion: "",
        state: "",
        district: "",
        pincode: "",
        plusTwoRegNumber: "",
        stream: "",
        plusTwoSchoolName: "",
        plusTwoSchoolPlace: "",
        lastQualification: "",
        lastQualificationMarks: "",
        totalAmountPaid: "",
        paymentRemark: "",
        createdBy: "",
        reference: {
          userType: "",
          userName: "",
          consultancyName: ""
        }
      });
      setCurrentStep(1);
    } catch (err) {
      setSubmissionStatus("idle");
      setModalMessage({ name: "Error", text: "Something went wrong." });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="enrollment-container">
      <div className="enrollment-header">
        <div className="header-content">
          <h1 className="header-title">Student Enrollment Portal</h1>
          <p className="header-subtitle">
            {currentStep === 1
              ? "Verify student ID to begin enrollment"
              : "Complete all required student information"}
          </p>
        </div>
        <div className="header-accent"></div>
      </div>

      <div className="progress-tracker">
        <div className={`progress-step ${currentStep === 1 ? "active" : ""}`}>
          <div className="step-indicator">
            <div className="step-number">1</div>
            <div className="step-connector"></div>
          </div>
          <div className="step-label">Verification</div>
        </div>
        <div className={`progress-step ${currentStep === 2 ? "active" : ""}`}>
          <div className="step-indicator">
            <div className="step-number">2</div>
            {currentStep === 1 && <div className="step-connector"></div>}
          </div>
          <div className="step-label">Details</div>
        </div>
      </div>

      <form className="enrollment-form" onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="verification-step">
            <div className="input-card">
              <div className="input-header">
                <svg className="input-icon" viewBox="0 0 24 24">
                  <path fill="#ff0000" d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,14.5 12,18 12,18C12,18 8.2,14.5 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M12,10A1.5,1.5 0 0,0 10.5,11.5A1.5,1.5 0 0,0 12,13A1.5,1.5 0 0,0 13.5,11.5A1.5,1.5 0 0,0 12,10Z" />
                </svg>
                <h3 className="input-title">Student Verification</h3>
              </div>
              <div className="input-group">
                <label className="input-label">
                  Register Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={student.studentId}
                  onChange={handleChange}
                  placeholder="Enter 10th Register Number"
                  className={`form-input ${formErrors.studentId ? "error" : ""}`}
                />
                {formErrors.studentId && (
                  <div className="error-message">
                    <svg className="error-icon" viewBox="0 0 24 24">
                      <path fill="#ff3333" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                    </svg>
                    {formErrors.studentId}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="primary-button verify-button"
                onClick={handleVerify}
              >
                Verify Student
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="details-step">
            <div className="form-sections">
              {/* Candidate Section */}
              <div className="form-section">
                <div className="section-header">
                  <svg className="section-icon" viewBox="0 0 24 24">
                    <path fill="#ff0000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg>
                  <h3 className="section-title">Candidate Information</h3>
                </div>
                <div className="input-grid">
                  <div className="input-group">
                    <label className="input-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="candidateName"
                      value={student.candidateName}
                      onChange={handleChange}
                      placeholder="Enter candidate's full name"
                      className={`form-input ${formErrors.candidateName ? "error" : ""}`}
                    />
                    {formErrors.candidateName && (
                      <div className="error-message">{formErrors.candidateName}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Mobile Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="candidateNumber"
                      value={student.candidateNumber}
                      onChange={handleChange}
                      placeholder="Enter 10-digit number"
                      className={`form-input ${formErrors.candidateNumber ? "error" : ""}`}
                    />
                    {formErrors.candidateNumber && (
                      <div className="error-message">{formErrors.candidateNumber}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="candidateEmail"
                      value={student.candidateEmail}
                      onChange={handleChange}
                      placeholder="Enter candidate's email"
                      className={`form-input ${formErrors.candidateEmail ? "error" : ""}`}
                    />
                    {formErrors.candidateEmail && (
                      <div className="error-message">{formErrors.candidateEmail}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      College <span className="required">*</span>
                    </label>
                    <select
                      name="college"
                      value={student.college}
                      onChange={handleChange}
                      className={`form-input ${formErrors.college ? "error" : ""}`}
                    >
                      <option value="">Select College</option>
                      {collegeOptions.map((college) => (
                        <option key={college.id} value={college.name}>
                          {college.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.college && (
                      <div className="error-message">{formErrors.college}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Course <span className="required">*</span>
                    </label>
                    <select
                      name="course"
                      value={student.course}
                      onChange={handleChange}
                      disabled={!student.college}
                      className={`form-input ${formErrors.course ? "error" : ""}`}
                    >
                      <option value="">Select Course</option>
                      {courseOptions.map((course, index) => (
                        <option key={index} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                    {formErrors.course && (
                      <div className="error-message">{formErrors.course}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Section */}
              <div className="form-section">
                <div className="section-header">
                  <svg className="section-icon" viewBox="0 0 24 24">
                    <path fill="#ff0000" d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                  </svg>
                  <h3 className="section-title">Personal Details</h3>
                </div>
                <div className="input-grid">
                  <div className="input-group">
                    <label className="input-label">
                      WhatsApp Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="whatsappNumber"
                      value={student.whatsappNumber}
                      onChange={handleChange}
                      placeholder="Enter WhatsApp number"
                      className={`form-input ${formErrors.whatsappNumber ? "error" : ""}`}
                    />
                    {formErrors.whatsappNumber && (
                      <div className="error-message">{formErrors.whatsappNumber}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Date of Birth <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={student.dob}
                      onChange={handleChange}
                      className={`form-input ${formErrors.dob ? "error" : ""}`}
                    />
                    {formErrors.dob && (
                      <div className="error-message">{formErrors.dob}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Gender <span className="required">*</span>
                    </label>
                    <select
                      name="gender"
                      value={student.gender}
                      onChange={handleChange}
                      className={`form-input ${formErrors.gender ? "error" : ""}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.gender && (
                      <div className="error-message">{formErrors.gender}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Aadhaar Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="adhaarNumber"
                      value={student.adhaarNumber}
                      onChange={handleChange}
                      placeholder="Enter 12-digit Aadhaar number"
                      className={`form-input ${formErrors.adhaarNumber ? "error" : ""}`}
                    />
                    {formErrors.adhaarNumber && (
                      <div className="error-message">{formErrors.adhaarNumber}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Religion <span className="required">*</span>
                    </label>
                    <select
                      name="religion"
                      value={student.religion}
                      onChange={handleChange}
                      className={`form-input ${formErrors.religion ? "error" : ""}`}
                    >
                      <option value="">Select Religion</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Christian">Christian</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.religion && (
                      <div className="error-message">{formErrors.religion}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Father's Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={student.fatherName}
                      onChange={handleChange}
                      placeholder="Enter father's name"
                      className={`form-input ${formErrors.fatherName ? "error" : ""}`}
                    />
                    {formErrors.fatherName && (
                      <div className="error-message">{formErrors.fatherName}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Parent's Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="parentNumber"
                      value={student.parentNumber}
                      onChange={handleChange}
                      placeholder="Enter parent's number"
                      className={`form-input ${formErrors.parentNumber ? "error" : ""}`}
                    />
                    {formErrors.parentNumber && (
                      <div className="error-message">{formErrors.parentNumber}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Mother's Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={student.motherName}
                      onChange={handleChange}
                      placeholder="Enter mother's name"
                      className={`form-input ${formErrors.motherName ? "error" : ""}`}
                    />
                    {formErrors.motherName && (
                      <div className="error-message">{formErrors.motherName}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Mother's Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="motherNumber"
                      value={student.motherNumber}
                      onChange={handleChange}
                      placeholder="Enter mother's number"
                      className={`form-input ${formErrors.motherNumber ? "error" : ""}`}
                    />
                    {formErrors.motherNumber && (
                      <div className="error-message">{formErrors.motherNumber}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      State <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={student.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      className={`form-input ${formErrors.state ? "error" : ""}`}
                    />
                    {formErrors.state && (
                      <div className="error-message">{formErrors.state}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      District <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={student.district}
                      onChange={handleChange}
                      placeholder="Enter district"
                      className={`form-input ${formErrors.district ? "error" : ""}`}
                    />
                    {formErrors.district && (
                      <div className="error-message">{formErrors.district}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Pincode <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={student.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      className={`form-input ${formErrors.pincode ? "error" : ""}`}
                    />
                    {formErrors.pincode && (
                      <div className="error-message">{formErrors.pincode}</div>
                    )}
                  </div>


                  <div className="input-group">
                    <label className="input-label">
                      Address <span className="required">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={student.address}
                      onChange={handleChange}
                      placeholder="Enter full address"
                      className={`form-input ${formErrors.address ? "error" : ""}`}
                      rows="3"
                    />
                    {formErrors.address && (
                      <div className="error-message">{formErrors.address}</div>
                    )}
                  </div>

                </div>
              </div>

              {/* Academic Section */}
              <div className="form-section">
                <div className="section-header">
                  <svg className="section-icon" viewBox="0 0 24 24">
                    <path fill="#ff0000" d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                  </svg>
                  <h3 className="section-title">Academic Details</h3>
                </div>
                <div className="input-grid">
                  <div className="input-group">
                    <label className="input-label">
                      +2 Register Number
                    </label>
                    <input
                      type="text"
                      name="plusTwoRegNumber"
                      value={student.plusTwoRegNumber}
                      onChange={handleChange}
                      placeholder="Enter register number"
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                     Stream
                    </label>
                    <input
                      type="text"
                      name="stream"
                      value={student.stream}
                      onChange={handleChange}
                      placeholder="Enter your stream"
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      +2 School Name
                    </label>
                    <input
                      type="text"
                      name="plusTwoSchoolName"
                      value={student.plusTwoSchoolName}
                      onChange={handleChange}
                      placeholder="Enter school name"
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      School Place
                    </label>
                    <input
                      type="text"
                      name="plusTwoSchoolPlace"
                      value={student.plusTwoSchoolPlace}
                      onChange={handleChange}
                      placeholder="Enter school place"
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Last Qualification
                    </label>
                    <select
                      name="lastQualification"
                      value={student.lastQualification}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select Qualification</option>
                      <option value="SSLC">SSLC</option>
                      <option value="Plus Two">Plus Two</option>
                      <option value="Degree">Degree</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Mark Percentage
                    </label>
                    <input
                      type="text"
                      name="lastQualificationMarks"
                      value={student.lastQualificationMarks}
                      onChange={handleChange}
                      placeholder="Enter mark percentage"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Reference Section */}
              <div className="form-section">
                <div className="section-header">
                  <svg className="section-icon" viewBox="0 0 24 24">
                    <path fill="#ff0000" d="M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14M17,12A5,5 0 0,0 12,17A5,5 0 0,0 17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12M12,13.47C12,12.65 11.3,12 10.5,12C9.7,12 9,12.65 9,13.47V14H12V13.47M6,6H18C19.1,6 20,6.9 20,8V12.1C19.68,12.04 19.34,12 19,12C18.66,12 18.32,12.04 18,12.1V8H6V19H12.1C12.21,19.72 12.46,20.39 12.81,21H6C4.9,21 4,20.1 4,19V8C4,6.9 4.9,6 6,6M10,1H14V3H10V1Z" />
                  </svg>
                  <h3 className="section-title">Reference Information</h3>
                </div>
                <div className="input-grid">
                  <div className="input-group">
                    <label className="input-label">
                      Reference Type <span className="required">*</span>
                    </label>
                    <select
                      name="reference.userType"
                      value={student.reference?.userType || ""}
                      onChange={(e) => {
                        handleChange(e);
                        // Auto-fill consultancy name if Freelance Associate is selected
                        if (e.target.value === "Associate") {
                          setStudent(prev => ({
                            ...prev,
                            reference: {
                              ...prev.reference,
                              consultancyName: "Associate"
                            }
                          }));
                        } else if (e.target.value === "Direct") {
                          setStudent(prev => ({
                            ...prev,
                            reference: {
                              ...prev.reference,
                              userName: "Direct",
                              consultancyName: ""
                            }
                          }));
                        }
                      }}
                      className={`form-input ${formErrors["reference.userType"] ? "error" : ""}`}
                    >
                      <option value="">Select Reference Type</option>
                      <option value="Direct">Direct</option>
                      <option value="Associate">Associate</option>
                      <option value="Consultancy">Consultancy</option>
                    </select>
                    {formErrors["reference.userType"] && (
                      <div className="error-message">{formErrors["reference.userType"]}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Reference Name
                    </label>
                    <input
                      type="text"
                      name="reference.userName"
                      value={student.reference?.userName || ""}
                      onChange={handleChange}
                      placeholder="Enter reference name"
                      disabled={student.reference?.userType === "Direct"}
                      className={`form-input ${formErrors["reference.userName"] ? "error" : ""} ${student.reference?.userType === "Direct" ? "disabled" : ""
                        }`}
                    />
                    {formErrors["reference.userName"] && (
                      <div className="error-message">{formErrors["reference.userName"]}</div>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Consultancy Name
                    </label>
                    <input
                      type="text"
                      name="reference.consultancyName"
                      value={student.reference?.consultancyName || ""}
                      onChange={handleChange}
                      placeholder="Enter consultancy name"
                      disabled={student.reference?.userType !== "Consultancy"}
                      className={`form-input ${student.reference?.userType !== "Consultancy" ? "disabled" : ""
                        }`}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="form-section">
                <div className="section-header">
                  <svg className="section-icon" viewBox="0 0 24 24">
                    <path fill="#ff0000" d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" />
                  </svg>
                  <h3 className="section-title">Payment Information</h3>
                </div>
                <div className="input-grid">
                  <div className="input-group">
                    <label className="input-label">
                      Total Amount Paid
                    </label>
                    <input
                      type="text"
                      name="totalAmountPaid"
                      value={student.totalAmountPaid}
                      onChange={handleChange}
                      placeholder="Enter amount paid"
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      Payment Remarks
                    </label>
                    <textarea
                      name="paymentRemark"
                      value={student.paymentRemark}
                      onChange={handleChange}
                      placeholder="Enter payment remarks"
                      rows="3"
                      className="form-textarea"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setCurrentStep(1)}
              >
                <svg className="button-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                </svg>
                Back to Verification
              </button>
              <button
                type="submit"
                className="primary-button"
                disabled={submissionStatus === "loading"}
              >
                {submissionStatus === "loading" ? (
                  <>
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                    Processing Enrollment...
                  </>
                ) : (
                  <>
                    <svg className="button-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M17,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M6,6H15V10H6V6Z" />
                    </svg>
                    Complete Enrollment
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default AddStudent;