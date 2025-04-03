import React, { useState } from 'react';
import { Provider } from '../types';

interface ProviderFormProps {
  provider?: Provider;
  onSubmit: (data: Partial<Provider>) => void;
  onCancel: () => void;
}

export default function ProviderForm({ provider, onSubmit, onCancel }: ProviderFormProps) {
  const [formData, setFormData] = useState({
    firstName: provider?.firstName || '',
    lastName: provider?.lastName || '',
    personalEmail: provider?.personalEmail || '',
    phone: provider?.phone || '',
    title: provider?.title || '',
    languages: provider?.languages?.join(', ') || '',
    bio: provider?.bio || '',
    photoUrl: provider?.photoUrl || '',
    availability: provider?.availability ?? true,
    medicalSchool: provider?.medicalSchool || '',
    residency: provider?.residency || '',
    residencyStartYear: provider?.residencyStartYear?.toString() || '',
    residencyGradYear: provider?.residencyGradYear?.toString() || '',
    personalBookingLink: provider?.personalBookingLink || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      languages: formData.languages.split(',').map(lang => lang.trim()).filter(Boolean),
      availability: Boolean(formData.availability),
      residencyStartYear: formData.residencyStartYear ? parseInt(formData.residencyStartYear, 10) : null,
      residencyGradYear: formData.residencyGradYear ? parseInt(formData.residencyGradYear, 10) : null
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#091747]">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
              required
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#091747]">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="personalEmail"
              value={formData.personalEmail}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
            />
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#091747]">Professional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
              required
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#091747]">Education</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Medical School</label>
            <input
              type="text"
              name="medicalSchool"
              value={formData.medicalSchool}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Residency</label>
            <input
              type="text"
              name="residency"
              value={formData.residency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Residency Start Year</label>
              <input
                type="text"
                name="residencyStartYear"
                value={formData.residencyStartYear}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Residency Graduation Year</label>
              <input
                type="text"
                name="residencyGradYear"
                value={formData.residencyGradYear}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#091747]">Additional Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Languages (comma-separated)</label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="url"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Personal Booking Link</label>
            <input
              type="url"
              name="personalBookingLink"
              value={formData.personalBookingLink}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#091747] focus:ring-[#091747]"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-4 w-4 text-[#091747] focus:ring-[#091747] border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Available for new patients
            </label>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#091747]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#091747] hover:bg-[#0c1f5e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#091747]"
        >
          {provider ? 'Update Provider' : 'Add Provider'}
        </button>
      </div>
    </form>
  );
} 