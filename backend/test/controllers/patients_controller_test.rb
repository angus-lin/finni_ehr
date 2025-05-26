require "test_helper"

class PatientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @patient = patients(:one)
  end

  test "should get index" do
    get patients_url, as: :json
    assert_response :success
  end

  test "should create patient" do
    assert_difference("Patient.count") do
      post patients_url, params: { patient: { city: @patient.city, country: @patient.country, dob: @patient.dob, first_name: @patient.first_name, last_name: @patient.last_name, middle_name: @patient.middle_name, postal_code: @patient.postal_code, province: @patient.province, street_address: @patient.street_address } }, as: :json
    end

    assert_response :created
  end

  test "should show patient" do
    get patient_url(@patient), as: :json
    assert_response :success
  end

  test "should update patient" do
    patch patient_url(@patient), params: { patient: { city: @patient.city, country: @patient.country, dob: @patient.dob, first_name: @patient.first_name, last_name: @patient.last_name, middle_name: @patient.middle_name, postal_code: @patient.postal_code, province: @patient.province, street_address: @patient.street_address } }, as: :json
    assert_response :success
  end

  test "should destroy patient" do
    assert_difference("Patient.count", -1) do
      delete patient_url(@patient), as: :json
    end

    assert_response :no_content
  end
end
