class CreatePatients < ActiveRecord::Migration[8.0]
  def change
    create_table :patients do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.date :dob
      t.string :street_address
      t.string :city
      t.string :province
      t.string :postal_code
      t.string :country

      t.timestamps
    end
  end
end
