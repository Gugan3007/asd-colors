import React, { Component } from 'react';

/**
 * ============================================================
 * CLASS COMPONENT - ChildProfileForm
 * ============================================================
 * This is a CLASS COMPONENT that demonstrates:
 * 1. Class-based React component structure
 * 2. Constructor with state initialization
 * 3. Form handling with controlled inputs
 * 4. Event handling (onChange, onSubmit)
 * 5. Lifecycle methods (if needed)
 * ============================================================
 */

class ChildProfileForm extends Component {
  // Constructor - initializes state and binds methods
  constructor(props) {
    super(props);
    
    // STATE MANAGEMENT - storing form data
    this.state = {
      childName: '',
      age: '',
      sensoryLevel: 'moderate',
      favoriteColors: [],
      challenges: '',
      guardianEmail: '',
      isSubmitted: false,
      errors: {}
    };

    // Binding event handlers to 'this'
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  // EVENT HANDLER - handles text/select input changes
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: '' }
    });
  }

  // EVENT HANDLER - handles checkbox changes for favorite colors
  handleCheckboxChange(event) {
    const { value, checked } = event.target;
    this.setState(prevState => {
      if (checked) {
        return { favoriteColors: [...prevState.favoriteColors, value] };
      } else {
        return { favoriteColors: prevState.favoriteColors.filter(color => color !== value) };
      }
    });
  }

  // FORM VALIDATION
  validateForm() {
    const errors = {};
    
    if (!this.state.childName.trim()) {
      errors.childName = 'Child name is required';
    }
    
    if (!this.state.age || this.state.age < 2 || this.state.age > 18) {
      errors.age = 'Please enter a valid age (2-18)';
    }
    
    if (!this.state.guardianEmail.trim()) {
      errors.guardianEmail = 'Guardian email is required';
    } else if (!/\S+@\S+\.\S+/.test(this.state.guardianEmail)) {
      errors.guardianEmail = 'Please enter a valid email';
    }

    return errors;
  }

  // EVENT HANDLER - handles form submission
  handleSubmit(event) {
    event.preventDefault();
    
    const errors = this.validateForm();
    
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    // Form is valid - show success
    this.setState({ isSubmitted: true });
    
    // Log form data (in real app, would send to API)
    console.log('Form Submitted:', {
      childName: this.state.childName,
      age: this.state.age,
      sensoryLevel: this.state.sensoryLevel,
      favoriteColors: this.state.favoriteColors,
      challenges: this.state.challenges,
      guardianEmail: this.state.guardianEmail
    });
  }

  // Reset form to initial state
  resetForm() {
    this.setState({
      childName: '',
      age: '',
      sensoryLevel: 'moderate',
      favoriteColors: [],
      challenges: '',
      guardianEmail: '',
      isSubmitted: false,
      errors: {}
    });
  }

  // RENDER METHOD - required in class components
  render() {
    const { isLowStim } = this.props;
    const { isSubmitted, errors } = this.state;

    // Success message after form submission
    if (isSubmitted) {
      return (
        <div className="p-6 bg-green-50 rounded-xl border-4 border-green-500 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            ✅ Profile Created Successfully!
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Child:</strong> {this.state.childName}, Age {this.state.age}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Sensory Level:</strong> {this.state.sensoryLevel}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Guardian Email:</strong> {this.state.guardianEmail}
          </p>
          <button
            onClick={this.resetForm}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            Create Another Profile
          </button>
        </div>
      );
    }

    // Form UI
    return (
      <form onSubmit={this.handleSubmit} className="space-y-6">
        
        {/* Child Name - Text Input */}
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Child's Name *
          </label>
          <input
            type="text"
            name="childName"
            value={this.state.childName}
            onChange={this.handleInputChange}
            placeholder="Enter child's name"
            className={`w-full p-3 rounded-lg border-2 ${
              errors.childName ? 'border-red-400' : 'border-gray-300'
            } focus:outline-none focus:border-blue-500 ${
              isLowStim ? 'bg-stone-100' : 'bg-white'
            }`}
          />
          {errors.childName && (
            <p className="text-red-500 text-sm mt-1">{errors.childName}</p>
          )}
        </div>

        {/* Age - Number Input */}
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Age (2-18) *
          </label>
          <input
            type="number"
            name="age"
            value={this.state.age}
            onChange={this.handleInputChange}
            min="2"
            max="18"
            placeholder="Enter age"
            className={`w-full p-3 rounded-lg border-2 ${
              errors.age ? 'border-red-400' : 'border-gray-300'
            } focus:outline-none focus:border-blue-500 ${
              isLowStim ? 'bg-stone-100' : 'bg-white'
            }`}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        {/* Sensory Level - Select Dropdown */}
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Sensory Sensitivity Level
          </label>
          <select
            name="sensoryLevel"
            value={this.state.sensoryLevel}
            onChange={this.handleInputChange}
            className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
              isLowStim ? 'bg-stone-100' : 'bg-white'
            }`}
          >
            <option value="low">Low - Can handle bright colors</option>
            <option value="moderate">Moderate - Prefers muted colors</option>
            <option value="high">High - Needs minimal stimulation</option>
          </select>
        </div>

        {/* Favorite Colors - Checkboxes */}
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Favorite Colors to Learn
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Red', 'Yellow', 'Green', 'Blue', 'Purple', 'Orange'].map(color => (
              <label key={color} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={color.toLowerCase()}
                  checked={this.state.favoriteColors.includes(color.toLowerCase())}
                  onChange={this.handleCheckboxChange}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-700">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Challenges - Textarea */}
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Describe Any Learning Challenges
          </label>
          <textarea
            name="challenges"
            value={this.state.challenges}
            onChange={this.handleInputChange}
            rows="4"
            placeholder="E.g., Difficulty with red shades, gets overwhelmed by too many colors at once..."
            className={`w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 resize-none ${
              isLowStim ? 'bg-stone-100' : 'bg-white'
            }`}
          />
        </div>

        {/* Guardian Email - Email Input */}
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Guardian Email *
          </label>
          <input
            type="email"
            name="guardianEmail"
            value={this.state.guardianEmail}
            onChange={this.handleInputChange}
            placeholder="guardian@example.com"
            className={`w-full p-3 rounded-lg border-2 ${
              errors.guardianEmail ? 'border-red-400' : 'border-gray-300'
            } focus:outline-none focus:border-blue-500 ${
              isLowStim ? 'bg-stone-100' : 'bg-white'
            }`}
          />
          {errors.guardianEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.guardianEmail}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
            isLowStim
              ? 'bg-stone-300 text-stone-700 hover:bg-stone-400'
              : 'bg-asd-accent text-white hover:bg-sky-600 shadow-md'
          }`}
        >
          Create Child Profile
        </button>

      </form>
    );
  }
}

export default ChildProfileForm;
