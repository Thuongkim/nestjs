import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto/post.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    private readonly notificationService: NotificationsService,
  ) {}

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    const post = await this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException("Post doesn't exist");
    }
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async Create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
    const userId = req.user.id;
    const newPost = await this.postService.create(post, userId);
    const title = 'See new post now /post/' + newPost.id;
    const body = newPost.title + ': Have been post, read now!';
    this.notificationService.emitEvent(title, body);
    return newPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req,
  ): Promise<PostEntity> {
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      req.user.id,
      post,
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return the updated post
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async Delete(@Param('id') id: number, @Request() req) {
    const deleted = await this.postService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
