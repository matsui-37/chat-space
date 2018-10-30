module ApplicationHelper
  # def format_posted_time(time)
    # time.to_s(:default)
  def simple_time(time)
    time.strftime("%Y-%m-%d %H:%M:%S")
  end
end

# strftime関数()で年月と時間を指定している。
