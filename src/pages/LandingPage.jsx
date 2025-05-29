import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/LandingPage.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const scrollToForm = () => {
  const formElement = document.getElementById("form-section");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToCourse = () => {
  const formElement = document.getElementById("programs-section");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth" });
  }
};

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="hero-text" variants={itemVariants}>
              <h1 className="hero-title">
                <span className="gradient-text">Welcome To</span>
                <br />LITTLE FLOWER GROUP OF INSTITUTIONS
              </h1>
              <p className="hero-subtitle">
                Nurturing Excellence, Shaping Futures.
              </p>
              <div className="hero-actions">
                <button onClick={scrollToForm} className="primary-button">
                  Enroll Now
                  <span className="button-icon">→</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Why Choose Us ?
          </motion.h2>
          <div className="features-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13v2l7 4 7-4v-2l-7 4-7-4z" />
                  </svg>
                ),
                title: "Quality Education",
                description: "Offering a wide range of programs with a focus on academic excellence and practical skills"
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                ),
                title: "Experienced Faculty",
                description: "Learn from dedicated and experienced professors and industry professionals"
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm4 0h2v-2H7v2zm4 0h6v-2h-6v2zm4 6h6v-2h-6v2zM3 17h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm8-10H5V5h14v2zm0 2v10H5V9h14z" />
                  </svg>
                ),
                title: "Modern Infrastructure",
                description: "State-of-the-art facilities to support an enriching learning environment."
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4z" />
                  </svg>
                ),
                title: "Diverse Courses",
                description: "From Nursing to Management, find the course that aligns with your career goals."
              }
            ].map((feature, index) => (
              <motion.div
                className="feature-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-hover-decoration"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs-section" className="programs-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Programs
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Explore a variety of courses designed to equip you for success in high-demand fields.
          </motion.p>

          <div className="programs-grid">
            {[
              { title: "B.Sc. Nursing", desc: "Comprehensive nursing program with clinical training and theoretical foundations." },
              { title: "GNM", desc: "General Nursing and Midwifery program for aspiring healthcare professionals." },
              { title: "MBA Aviation", desc: "Specialized management program for the aviation industry." },
              { title: "BPT", desc: "Bachelor of Physiotherapy with hands-on training in rehabilitation." },
              { title: "M.Sc. Nursing", desc: "Advanced nursing specialization for career advancement." },
              { title: "BBA", desc: "Bachelor of Business Administration with industry-relevant curriculum." }
            ].map((program, index) => (
              <motion.div
                className="program-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="program-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H6a2 2 0 0 0-2 2v16a1 1 0 0 0 1.447.894L12 17.118l6.553 3.776A1 1 0 0 0 20 20V4a2 2 0 0 0-2-2zM8 18V6h8v12l-4-2.3L8 18z" />
                  </svg>
                </div>
                <h3>{program.title}</h3>
                <p>{program.desc}</p>
                <button
                  className="learn-more-btn"
                  onClick={scrollToForm}
                >
                  Learn More
                  <span className="arrow-icon">→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section id="form-section" className="form-section">
        <div className="container">
          <motion.div
            className="form-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="section-title">Student Enrollment</h2>
            <p className="section-subtitle">
              Complete your application in just a few steps. We'll guide you through the process.
            </p>
          </motion.div>

          <motion.div
            className="form-stepper-container"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Stepper Navigation */}
            <div className="stepper-nav">
              <div className="stepper-progress">
                <div className="stepper-progress-bar" style={{ width: '33%' }}></div>
              </div>
              <div className="stepper-steps">
                <div className="stepper-step active">
                  <div className="stepper-step-icon">1</div>
                  <div className="stepper-step-label">Personal Info</div>
                </div>
                <div className="stepper-step">
                  <div className="stepper-step-icon">2</div>
                  <div className="stepper-step-label">Academic Info</div>
                </div>
                <div className="stepper-step">
                  <div className="stepper-step-icon">3</div>
                  <div className="stepper-step-label">Review & Submit</div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="stepper-content">
              {/* Step 1 - Personal Information */}
              <div className="stepper-pane active">
                <form className="enrollment-form">
                  <div className="form-group">
                    <h3 className="form-section-title">
                      <svg className="form-section-icon" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      Personal Information
                    </h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="registerNumber">Register Number*</label>
                        <input type="text" id="registerNumber" name="registerNumber" required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="candidateName">Full Name*</label>
                        <input type="text" id="candidateName" name="candidateName" required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="candidateNumber">Mobile Number*</label>
                        <input type="tel" id="candidateNumber" name="candidateNumber" required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="candidateEmail">Email Address*</label>
                        <input type="email" id="candidateEmail" name="candidateEmail" required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="whatsappNumber">WhatsApp Number</label>
                        <input type="tel" id="whatsappNumber" name="whatsappNumber" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="gender">Gender*</label>
                        <select id="gender" name="gender" required>
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="next-step primary-button">
                      Next: Academic Info
                      <span className="button-icon">→</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Step 2 - Academic Information (hidden by default) */}
              <div className="stepper-pane">
                <form className="enrollment-form">
                  <div className="form-group">
                    <h3 className="form-section-title">
                      <svg className="form-section-icon" viewBox="0 0 24 24">
                        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                      </svg>
                      Academic Information
                    </h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="college">College</label>
                        <input type="text" id="college" name="college" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="course">Course*</label>
                        <select id="course" name="course" required>
                          <option value="">Select Course</option>
                          <option value="B.Sc. Nursing">B.Sc. Nursing</option>
                          <option value="GNM">GNM</option>
                          <option value="MBA Aviation">MBA Aviation</option>
                          <option value="BPT">BPT</option>
                          <option value="M.Sc. Nursing">M.Sc. Nursing</option>
                          <option value="BBA">BBA</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="lastQualification">Last Qualification</label>
                        <input type="text" id="lastQualification" name="lastQualification" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="lastQualificationMarks">Qualification Marks</label>
                        <input type="text" id="lastQualificationMarks" name="lastQualificationMarks" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="plusTwoRegNumber">Plus Two Register Number</label>
                        <input type="text" id="plusTwoRegNumber" name="plusTwoRegNumber" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="stream">Stream</label>
                        <input type="text" id="stream" name="stream" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="plusTwoSchoolName">School Name</label>
                        <input type="text" id="plusTwoSchoolName" name="plusTwoSchoolName" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="plusTwoSchoolPlace">School Place</label>
                        <input type="text" id="plusTwoSchoolPlace" name="plusTwoSchoolPlace" />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="prev-step secondary-button">
                      ← Back
                    </button>
                    <button type="button" className="next-step primary-button">
                      Next: Family Details
                      <span className="button-icon">→</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Step 3 - Family & Review (hidden by default) */}
              <div className="stepper-pane">
                <form className="enrollment-form">
                  <div className="form-group">
                    <h3 className="form-section-title">
                      <svg className="form-section-icon" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                      Family Information
                    </h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="fatherName">Father's Name</label>
                        <input type="text" id="fatherName" name="fatherName" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="parentNumber">Father's Number</label>
                        <input type="tel" id="parentNumber" name="parentNumber" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="alternativeNumber">Alternative Number</label>
                        <input type="tel" id="alternativeNumber" name="alternativeNumber" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="motherName">Mother's Name</label>
                        <input type="text" id="motherName" name="motherName" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="motherNumber">Mother's Number</label>
                        <input type="tel" id="motherNumber" name="motherNumber" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="adhaarNumber">Aadhaar Number</label>
                        <input type="text" id="adhaarNumber" name="adhaarNumber" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <h3 className="form-section-title">
                      <svg className="form-section-icon" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      Address Details
                    </h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="religion">Religion</label>
                        <input type="text" id="religion" name="religion" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name="state" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="district">District</label>
                        <input type="text" id="district" name="district" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="pincode">Pincode</label>
                        <input type="text" id="pincode" name="pincode" />
                      </div>
                      <div className="form-field full-width">
                        <label htmlFor="address">Full Address</label>
                        <textarea id="address" name="address" rows="3"></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <h3 className="form-section-title">
                      <svg className="form-section-icon" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                      </svg>
                      Payment Information
                    </h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="totalAmountPaid">Total Amount Paid</label>
                        <input type="text" id="totalAmountPaid" name="totalAmountPaid" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="paymentRemark">Payment Remark</label>
                        <input type="text" id="paymentRemark" name="paymentRemark" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="createdBy">Created By</label>
                        <input type="text" id="createdBy" name="createdBy" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <h3 className="form-section-title">
                      <svg className="form-section-icon" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                      Reference Details
                    </h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="reference.userType">User Type</label>
                        <input type="text" id="reference.userType" name="reference.userType" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="reference.userName">User Name</label>
                        <input type="text" id="reference.userName" name="reference.userName" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="reference.consultancyName">Consultancy Name</label>
                        <input type="text" id="reference.consultancyName" name="reference.consultancyName" />
                      </div>
                    </div>
                  </div>

                  <div className="form-review">
                    <h4 className="review-title">Review Your Information</h4>
                    <p className="review-note">
                      Please review all the information you've entered before submitting your application.
                    </p>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="prev-step secondary-button">
                      ← Back
                    </button>
                    <button type="submit" className="primary-button">
                      Submit Application
                      <span className="button-icon">→</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What Our Students Say
          </motion.h2>

          <div className="testimonials-grid">
            {[
              {
                content: "This portal made my enrollment process so smooth and efficient. I completed everything in just 15 minutes!",
                author: "Rajesh Kumar",
                role: "B.Sc. Nursing Student"
              },
              {
                content: "The intuitive interface helped me navigate the application without any confusion. Highly recommended!",
                author: "Priya Sharma",
                role: "MBA Aviation Student"
              },
              {
                content: "As an international student, I appreciated how straightforward the process was. Great support team too!",
                author: "David Wilson",
                role: "M.Sc. Nursing Student"
              }
            ].map((testimonial, index) => (
              <motion.div
                className="testimonial-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
                <div className="testimonial-decoration"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2>Ready to Begin Your Journey?</h2>
            <p>Join thousands of students who have transformed their careers through our programs.</p>
            <div className="cta-buttons">
              <button onClick={scrollToForm} className="secondary-button">
                Contact Us
                <span className="button-icon">→</span>
              </button>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-logo">LITTLE FLOWER GROUP</div>
              <p className="footer-description">
                Committed to providing top-tier education and fostering an environment of growth and innovation.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#enquiry-form-section" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>Admissions</a></li>
                  <li><a href="#programs-section" onClick={(e) => { e.preventDefault(); scrollToCourse(); }}>Courses</a></li>
                  <li><a href="#enquiry-form-section" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>Contact Us</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h3>Contact Info</h3>
                <address>
                  <p>Bangalore, Karnataka, India</p>
                  <p>+91 9XXXX XXXXX / 8XXXX XXXXX</p>
                  <p>info@littleflowerinstitutions.com</p>
                </address>
              </div>

            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              © {new Date().getFullYear()} Student Enrollment Portal. All rights reserved.
            </div>
            <div className="footer-credits">
              Designed with ❤️ for better education
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;