defmodule Slideshow.LayoutView do
  use Slideshow.Web, :view

  # orig: "<script src=\"#{static_path(@conn, "/js/app.js")}\"></script>"

  def js_script_tag do
    if Mix.env == :prod do
      "<script src=\"/js/app.js\"></script>"
    else
      "<script src=\"http://localhost:8080/js/app.js\"></script>"
    end
  end

  def css_link_tag do
    if Mix.env == :prod do
      "<link rel=\"stylesheet\" type=\"text/css\" href=\"/css/app.css\">"
    else
      ""
    end
  end
end
