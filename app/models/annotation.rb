class Annotation < ActiveRecord::Base
  attr_accessible :body, :song_id, :user_id
  before_save :sanitize_body
  
  belongs_to :user
  belongs_to :song
  
  def sanitize_body
    youtube = lambda do |env|
      node      = env[:node]
      node_name = env[:node_name]

      # Don't continue if this node is already whitelisted or is not an element.
      return if env[:is_whitelisted] || !node.element?

      # Don't continue unless the node is an iframe.
      return unless node_name == 'iframe'

      # Verify that the video URL is actually a valid YouTube video URL.
      return unless node['src'] =~ /\Ahttps?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\//

      # We're now certain that this is a YouTube embed, but we still need to run
      # it through a special Sanitize step to ensure that no unwanted elements or
      # attributes that don't belong in a YouTube embed can sneak in.
      Sanitize.clean_node!(node, {
        :elements => %w[iframe],

        :attributes => {
          'iframe'  => %w[allowfullscreen frameborder height src width]
        }
      })

      # Now that we're sure that this is a valid YouTube embed and that there are
      # no unwanted elements or attributes hidden inside it, we can tell Sanitize
      # to whitelist the current node.
      {:node_whitelist => [node]}
    end
    
    self.body = Sanitize.clean(self.body, 
      :elements => ['a', 'br'],
      :attributes => {'a' => ['href', 'class']},
      :protocols => {'a' => {'href' => ['http', 'https']}},
      :remove_contents => true,
      :transformers => youtube
    )
  end
end
