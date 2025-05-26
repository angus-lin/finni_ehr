class Patient < ApplicationRecord
    validates :first_name, :last_name, :dob, :street_address, :city, :province, :postal_code, :country, presence: true
    validates :status, inclusion: {in: ["Inquiry", "Onboarding", "Active", "Churned"] }

    validate :date_is_passed, on: :create

private

def date_is_passed
  return unless self.dob.present?
  errors.add(:dob, 'must be passed') unless self.dob < Date.today
end
end
