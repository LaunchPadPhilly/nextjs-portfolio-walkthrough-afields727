"use client";
import React, { useState } from 'react';
import TechnologyInput from './TechnologyInput.js';

const ProjectForm = ({ isOpen, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    technologies: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.technologies.length === 0) newErrors.technologies = 'At least one technology is required';
    if (formData.imageUrl && !/^https?:\/\//.test(formData.imageUrl)) newErrors.imageUrl = 'Please enter a valid URL';
    if (formData.projectUrl && !/^https?:\/\//.test(formData.projectUrl)) newErrors.projectUrl = 'Please enter a valid URL';
    if (formData.githubUrl && !/^https?:\/\//.test(formData.githubUrl)) newErrors.githubUrl = 'Please enter a valid URL';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      await onSubmit(formData);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (technologies) => {
    setFormData(prev => ({ ...prev, technologies }));
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '500px' }}>
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="title">Project Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '8px' }} className={errors.title ? 'border-red-500' : ''} />
            {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} style={{ width: '100%', padding: '8px' }} className={errors.description ? 'border-red-500' : ''}></textarea>
            {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
             {errors.imageUrl && <p style={{ color: 'red' }}>{errors.imageUrl}</p>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="projectUrl">Project URL</label>
            <input type="text" id="projectUrl" name="projectUrl" value={formData.projectUrl} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
            {errors.projectUrl && <p style={{ color: 'red' }}>{errors.projectUrl}</p>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="githubUrl">GitHub URL</label>
            <input type="text" id="githubUrl" name="githubUrl" value={formData.githubUrl} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
            {errors.githubUrl && <p style={{ color: 'red' }}>{errors.githubUrl}</p>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Technologies</label>
            <TechnologyInput technologies={formData.technologies} onChange={handleTechChange} />
            {errors.technologies && <p style={{ color: 'red' }}>{errors.technologies}</p>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onCancel} style={{ padding: '10px 20px' }}>Cancel</button>
            <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}>
              {isSubmitting ? 'Creating Project...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
